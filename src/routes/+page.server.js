import prisma from "$lib/prisma";

export const load = async () => {
    const todos = await prisma.todoItem.findMany();
    return {
        todos,
    }
}

/**
 * @type {import('./$types').Actions}
 */
export const actions = {
    add_todo: async ({ request }) => {
        let data = await request.formData();
        let name = data.get('name');
        if (!name) { throw new Error('name cannot be empty') };
        const new_todo = await prisma.todoItem.create({ data: { name: name.toString() } });
        return {
            successful: true,
            new_todo,
        }
    },
    delete_todo: async ({ request }) => {
        let data = await request.formData();
        let id = data.get('id');
        if (!id) { throw new Error('id cannot be empty') };
        await prisma.todoItem.delete({ where: { id: Number(id ?? 0) } });
        return {
            successful: true,
            id
        }
    },
    update_todo: async ({ request }) => {
        let data = await request.formData();
        let id = data.get('id');
        let name = data.get('name');
        if (!id || !name) { throw new Error('name cannot be empty') };
        await prisma.todoItem.update({ where: { id: Number(id ?? 0) }, data: { name: name.toString() } });
        return {
            successful: true
        }
    }
}
