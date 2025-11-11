import {Student} from "../model/student.js";

const students = new Map();

export const addStudent = ({id, name, password}) => {
    if (students.has(id)) {
        return false;
    }
    students.set(+id, new Student(+id, name, password));
    return true;
}

export const findStudent = id => students.get(id);

export const deleteStudent = id => students.delete(id);

export const updateStudent = (id, {name, password}) => {
    const student = students.get(id);
    if (student) {
        student.name = name;
        student.password = password;
        return true;
    } else {
        return false;
    }
}

export const addScore = (id, {examName, score}) => {
    const student = students.get(id);
    if (student) {
        student.scores[examName] = score
        return true;
    } else {
        return false;
    }
}

export const findStudentByName = (name) => {
    const studentsWithThisName = [];
    for (const student of students.values()) {
        if (student.name.toLowerCase() === name.toLowerCase()) {
            const {password, ...studentWithoutPassword} = student
            studentsWithThisName.push(studentWithoutPassword);
        }
    }
    return studentsWithThisName;
}

export const countByNames = (names) => {
    let count = 0;
    for (const student of students.values()) {
        for (let i = 0; i < names.length; i++) {
            if (student.name.toLowerCase() === names[i].toLowerCase()) {
                count++
            }
        }
    }
    return count;
}

export const findByMinScore = (exam, minScore) => {
    const studentsHavingMinScore = [];
    for (const student of students.values()) {
        if (student.scores[exam] >= minScore) {
            const {password, ...studentWithoutPassword} = student
            studentsHavingMinScore.push(studentWithoutPassword);
        }
    }
    return studentsHavingMinScore;
}

