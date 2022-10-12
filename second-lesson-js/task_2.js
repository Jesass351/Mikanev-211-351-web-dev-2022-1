function task_2(array)
{
    let result = [];
    for (let i = 0; i < array.length; i++)
    {
        let flag = false;
        for (let j = 0; j < result.length; j++)
        {
            if (result[j].name == array[i])
            {
                result[j].count += 1;
                flag = true;
            }
        }
        if (!flag) {
            let numbers = {
                name: array[i],
                count: 1,
            }
            result.push(numbers);
        }
    }
    for (let i = 0; i < result.length; i++)
    {
        if (result[i].count == 1)
        {
            result.splice(i,1);
        }
    }

    return result;
}

let array = [1,1,2,2,3,4,4,5,1]

console.log(task_2(array));