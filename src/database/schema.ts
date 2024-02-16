import { text, varchar, mysqlTable, bigint, boolean } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
    id: varchar('id', { length: 255 }).primaryKey(),
    createdAt: bigint('created_at', { mode: 'bigint' }),
    banned: boolean('banned'),
    profileImageUrl: text('profile_image_url'),
    role: text('role'),
    firstName: text('first_name'),
    lastName: text('last_name'),
    emailAddress: text('email_address'),
})

export const students = mysqlTable('students', {
    id: varchar('id', { length: 255 }).primaryKey(),
    institution: text('institution'),
    grade: text('grade'),
    english: boolean('english'),
    french: boolean('french'),
    math: boolean('math'),
    science: boolean('science'),
    chemistry: boolean('chemistry'),
    physics: boolean('physics'),
    other: text('other')
})

export const tutors = mysqlTable('tutors', {
    id: varchar('id', { length: 255 }).primaryKey(),
    isVerified: boolean('is_verified'),
    institution: text('institution'),
    yearLevel: text('year_level'),
    program: text('program'),
    gpa: text('gpa'),
    english: boolean('english'),
    french: boolean('french'),
    math: boolean('math'),
    science: boolean('science'),
    chemistry: boolean('chemistry'),
    physics: boolean('physics'),
    other: text('other')
})
