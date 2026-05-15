// ============================================
// USERS SERVICE
// MOS360 USER LEGITIMACY LAYER
// ============================================

// ============================================
// CREATE USER
// ============================================

export async function createUser(
    env,
    userData
) {

    const user = {

        id:
            crypto.randomUUID(),

        email:
            userData.email,

        role:
            userData.role || "student",

        profile: {

            name:
                userData.name || "",

            avatar: "",

            createdAt:
                Date.now()
        },

        progression: {

            xp: 0,

            streak: 0,

            lastActive: null
        },

        stats: {

            coursesCompleted: 0,

            lessonsCompleted: 0
        }
    };

    await env.MOS360_USERS_KV.put(

        `user:${user.email}`,

        JSON.stringify(user)
    );

    return user;
}

// ============================================
// GET USER BY EMAIL
// ============================================

export async function getUserByEmail(
    env,
    email
) {

    const raw =

        await env.MOS360_USERS_KV.get(
            `user:${email}`
        );

    if (!raw) {
        return null;
    }

    return JSON.parse(raw);
}

// ============================================
// UPDATE USER
// ============================================

export async function updateUser(
    env,
    email,
    updates
) {

    const user =

        await getUserByEmail(
            env,
            email
        );

    if (!user) {
        return null;
    }

    const updatedUser = {

        ...user,

        ...updates
    };

    await env.MOS360_USERS_KV.put(

        `user:${email}`,

        JSON.stringify(
            updatedUser
        )
    );

    return updatedUser;
}