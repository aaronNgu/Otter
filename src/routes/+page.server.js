import prisma from "$lib/prisma";
import { fail } from "@sveltejs/kit";

export const load = async () => {
    const todos = await prisma.todoItem.findMany({ where: { deletedAt: { equals: null } } });
    return {
        todos: todos
    }
}

/**
 * @type {import('./$types').Actions}
 */
export const actions = {
    add_todo: async ({ request }) => {
        let data = await request.formData();
        let name = data.get('name');
        if (!name) { return fail(400, { error_msg: 'name cannot be empty', id: 0 }) };
        const new_todo = await prisma.todoItem.create({ data: { name: name.toString() } });
        return {
            successful: true,
            new_todo,
            id: Number(new_todo.id),
        }
    },
    delete_todo: async ({ request }) => {
        let data = await request.formData();
        let id = data.get('id');
        let deletedAt = data.get('deletedAt');
        if (!id) { return fail(400, { error_msg: 'id cannot be empty', id }) };
        if (!deletedAt) { return fail(400, { error_msg: 'deletedAt cannot be empty', id }) };
        await prisma.todoItem.update({ where: { id: Number(id ?? 0) }, data: { deletedAt: { set: deletedAt?.toString() } } });
        return {
            delete_todo: true,
            successful: true,
            id
        }
    },
    update_todo: async ({ request }) => {
        let data = await request.formData();
        let id = data.get('id');
        let name = data.get('name');
        if (!id || !name) { return fail(400, { error_msg: 'name cannot be empty', id }); };
        await prisma.todoItem.update({ where: { id: Number(id ?? 0) }, data: { name: name?.toString() } });
        return {
            update_todo: true,
            successful: true
        }
    }
}
