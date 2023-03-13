/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export default function login_validate(values){
    const errors = {};

    if(!values.email)
        errors.email = "Required";
}