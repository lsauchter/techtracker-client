export const findUser = (users=[], userId) =>
    users.find(person => person.id === userId)

export const findInventory = (inventory=[], inventoryId) =>
    inventory.find(item => Number(item.id) === inventoryId)