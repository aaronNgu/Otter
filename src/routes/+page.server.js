import { todos } from "./data";

let faketodos = todos;
let nextId = 4;

export function load() {
    return {
        todos: faketodos.map((todo) => ({
            id: todo.id,
            name: todo.name,
        }))
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
        let newItemId = nextId;
        faketodos.push({ id: newItemId, name: name.toString() });
        nextId += 1;
        return {
            successful: true,
            new_todo: {
                id: newItemId,
                name: name.toString()
            }
        }
    },
    delete_todo: async ({ request }) => {
        let data = await request.formData();
        let id = data.get('id');
        if (!id) { throw new Error('id cannot be empty') };
        faketodos = faketodos.filter((todo) => todo.id != Number(id ?? 0));
        return {
            successful: true
        }
    },
    update_todo: async ({ request }) => {
        let data = await request.formData();
        let id = data.get('id');
        let name = data.get('name');
        if (!id || !name) { throw new Error('name cannot be empty') };
        let to_update = faketodos.find((ele) => ele.id == Number(id ?? 0));
        if (!to_update) throw new Error('item not found');
        to_update.name = name?.toString();
        return {
            successful: true
        }
    }
}
