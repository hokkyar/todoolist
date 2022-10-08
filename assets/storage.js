const STORAGE_KEY = 'TODOO_APPS';

function checkStorage() {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}

