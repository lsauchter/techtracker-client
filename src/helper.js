export const findUser = (users=[], userId) =>
    users.find(person => Number(person.id) === Number(userId))

export const findUserByName = (users=[], userName) =>
users.find(person => person.name === userName)

export const findInventory = (inventory=[], inventoryId) =>
    inventory.find(item => Number(item.id) === Number(inventoryId))