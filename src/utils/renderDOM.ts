import Block from "../components/Block/index.js";

export function render(query: string, block: Block<any> | null) {
    const root = document.querySelector(query);

    if (!root || !block) {
        return null;
    }

    const content = block.getContent();
    if (!content) {
        return null;
    }

    root.appendChild(content);

    return root;
}

export function clear(query: string, block: Block<any> | null) {
    const root = document.querySelector(query);

    if (!root || !block) {
        return null;
    }

    const content = block.getContent();
    if (!content) {
        return null;
    }

    root.removeChild(content);
    Block._instances = [];

    return root;
}