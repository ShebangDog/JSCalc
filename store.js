const Store = (table = {}) => { 
    return ({
        set: (ident, value) => Store({ ...table, [ident]: value }),
        get: (ident) => table[ident]
    })
}

export const EmptyStore = Store()
