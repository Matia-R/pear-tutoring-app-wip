export default function NavSignInOption() {
    return (
        <div>
            <p className="text-sm leading-5 text-gray-700">You are not currently sign in</p>
            <div className="flex pt-1">
                <a className="text-sm text-green-600 font-medium leading-5 truncate hover:underline" href="/sign-in">sign in</a>
                <p className="pl-2 text-sm leading-5 text-gray-700">or</p>
                <a className="pl-2 text-sm text-green-600 font-medium leading-5 truncate hover:underline" href="/sign-up">create an account</a>
            </div>
        </div>
    )
}