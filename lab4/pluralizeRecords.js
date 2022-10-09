function pluralizeRecords(n){
    if (n % 10 == 1 && n % 100 != 11){
        return `В результате выполнения запроса была найдена ${n} запись`;
    }else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        return `В результате выполнения запроса было найдено ${n} записи`;
    } else {
        return `В результате выполнения запроса было найдено ${n} записей`;
    }

}


console.log(pluralizeRecords(1));
console.log(pluralizeRecords(2));
console.log(pluralizeRecords(6));