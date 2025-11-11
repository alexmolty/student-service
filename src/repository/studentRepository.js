let collection;
export const init = db => collection = db.collection("college");

export const addStudent = async ({id, name, password}) => {
    const student = {_id: id, name, password, scores:{}};
    const existingStudent = await collection.findOne({_id: id});
    if(existingStudent) return false
    else return await collection.insertOne(student)
}

export const findStudent = async id => {
    return await collection.findOne({_id: id});
}

export const deleteStudent = async id => {
    return await collection.findOneAndDelete({_id: id});
}

export const updateStudent = async (id, data) => {
    return await collection.findOneAndUpdate({_id: id}, {$set: data}, {returnDocument: "after"});
}

export const addScore = async (id, {examName, score}) => {
    return await collection.findOneAndUpdate(
        {_id: id},
        {$set: {[`scores.${examName}`]: score}}
    )
}

export const findStudentByName = async (name) => {
    return await collection.find({name: {$regex: name, $options: "i"}}).toArray();
}

export const countByNames = async (names) => {
    return await collection.countDocuments({name: {$in: names}});
}

export const findByMinScore = async (exam, minScore) => {
    return await collection.find({[`scores.${exam}`]: {$gte: minScore}}).toArray();
}

