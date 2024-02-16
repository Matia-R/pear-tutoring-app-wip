import { type IncomingHttpHeaders } from "http"
import type { NextApiRequest, NextApiResponse } from "next"
import { Webhook, type WebhookRequiredHeaders } from "svix"
import { buffer } from "micro"
import { db } from "~/database/db"
import { type InferModel } from "drizzle-orm"
import { users, students, tutors } from "~/database/schema"

// Disable the bodyParser so we can access the raw
// request body for verification.
export const config = {
    api: {
        bodyParser: false,
    },
};

const webhookSecret: string = process.env.WEBHOOK_SECRET || "";

export default async function handler(
    req: NextApiRequestWithSvixRequiredHeaders,
    res: NextApiResponse
) {
    // Verify the webhook signature
    // See https://docs.svix.com/receiving/verifying-payloads/how
    const payload = (await buffer(req)).toString();
    const headers = req.headers;
    const wh = new Webhook(webhookSecret);
    let evt: Event | null = null;
    try {
        evt = wh.verify(payload, headers) as Event;
    } catch (_) {
        return res.status(400).json({ 'error': 'bad webhook request' });
    }

    // Handle the webhook
    const eventType: EventType = evt.type;
    if (eventType === 'user.created') {

        const eventData = evt.data as unknown as DataRecord
        const userMetadata = eventData.unsafe_metadata as DataRecord
        const emailData = eventData.email_addresses as Array<DataRecord>
        const primaryEmail = emailData[0]?.email_address
        const role = userMetadata.role

        type NewUser = InferModel<typeof users, "insert">
        const insertUser = async (user: NewUser) => {
            return (await db.insert(users).values(user)).statement
        }
        const newUser: NewUser = {
            id: eventData.id as string,
            createdAt: BigInt(eventData.created_at as string),
            banned: eventData.banned as boolean,
            profileImageUrl: eventData.image_url as string,
            role: role as string,
            firstName: evt.data.first_name as string,
            lastName: evt.data.last_name as string,
            emailAddress: primaryEmail as string,
        }

        if (role === 'student') {

            type NewStudent = InferModel<typeof students, "insert">
            const insertStudent = async (student: NewStudent) => {
                return (await db.insert(students).values(student)).statement
            }
            const newStudent: NewStudent = {

                id: eventData.id as string,
                institution: userMetadata.institution as string,
                grade: userMetadata.grade as string,
                english: userMetadata.english as boolean,
                french: userMetadata.french as boolean,
                math: userMetadata.math as boolean,
                science: userMetadata.science as boolean,
                chemistry: userMetadata.chemistry as boolean,
                physics: userMetadata.physics as boolean,
                other: userMetadata.other as string,

            }

            const createdUser = await insertUser(newUser)
            const createdStudent = await insertStudent(newStudent)

            console.log(createdUser)
            console.log(createdStudent)

        }

        else if (role === 'tutor') {
            type NewTutor = InferModel<typeof tutors, "insert">
            const insertTutor = async (tutor: NewTutor) => {
                return (await db.insert(tutors).values(tutor)).statement
            }
            const defaultVerificationStatus = false // all new tutors unverified by default
            const newTutor: NewTutor = {

                id: eventData.id as string,
                isVerified: defaultVerificationStatus,
                institution: userMetadata.institution as string,
                program: userMetadata.program as string,
                yearLevel: userMetadata.yearLevel as string,
                gpa: userMetadata.gpa as string,
                english: userMetadata.english as boolean,
                french: userMetadata.french as boolean,
                math: userMetadata.math as boolean,
                science: userMetadata.science as boolean,
                chemistry: userMetadata.chemistry as boolean,
                physics: userMetadata.physics as boolean,
                other: userMetadata.other as string,

            }

            const createdUser = await insertUser(newUser)
            const createdTutor = await insertTutor(newTutor)

            console.log(createdUser)
            console.log(createdTutor)
        }

    }

    res.status(201).json({});
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
    headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

// Generic (and naive) way for the Clerk event
// payload type.
type Event = {
    data: Record<string, string | number>;
    object: "event";
    type: EventType;
};

type EventType = "user.created" | "user.updated" | "*";

type DataRecord = {
    [k: string]: unknown
}