export default {
    get (name, defaultData) {
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem(name)
            if (item && item !== 'undefined' && item !== 'null' && item != null) {
                return JSON.parse(item)
            } else {
                return defaultData
            }
        } else {
            return defaultData
        }
    },
    save (name, data, callback, err) {
        if (typeof localStorage !== 'undefined') {
            try {
                localStorage.setItem(name, JSON.stringify(data))
                if (callback) callback()
            } catch (e) {
                if (err) {
                    err('Unable to store ' + name + ' in localStorage due to ' + e.name)
                }
            }
        }
    },
    remove (name) {
        // name - Local storage key
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(name)
        }
    },
    clear () {
        if (typeof localStorage !== 'undefined') {
            localStorage.clear()
        }
    }
}
