import User from '../models/user'

export const usernameExist = async (username: string) => {
    const user = await User.findOne({
        where: {
            username
        }
    })

    if (user) throw new Error('Username already registered in the database');
}

export const emailExist = async (email: string) => {
    const user = await User.findOne({
        where: {
            email
        }
    });

    if (user) throw new Error('Email already exist in the database');
}