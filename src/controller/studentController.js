import * as repo from "../repository/studentRepository.js"


export const addStudent = async (req, res) => {
    const success = await repo.addStudent(req.body);
    if (success) {
        res.status(204).send();
    } else {
        res.status(409).send();
    }
}

export const findStudent = async (req, res) => {
    const student = await repo.findStudent(+req.params.id);
    if (student) {
        const {password, ...studentWithoutPassword} = student;
        res.json(studentWithoutPassword);
    } else {
        res.status(404).send();
    }
}

export const deleteStudent = async (req, res) => {
    const id = +req.params.id;
    const student = await repo.findStudent(id);
    if (student) {
        const {password, ...studentWithoutPassword} = student;
        res.json(studentWithoutPassword);
        await repo.deleteStudent(id)
    } else {
        res.status(404).send();
    }
}

export const updateStudent = async (req, res) => {
    const id = +req.params.id;
    const student = await repo.updateStudent(id, req.body)
    if (student) {
        const {scores, ...studentWithoutScores} = student;
        res.json(studentWithoutScores);
    } else {
        res.status(404).send();
    }
}

export const addScore = async (req, res) => {
    const success = await repo.addScore(+req.params.id, req.body);
    if (success) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
}

export const findStudentsByName = async (req, res) => {
    const students = await repo.findStudentByName(req.params.name);
    res.json(students);
}

export const countByNames = async (req, res) => {
    let names = req.query.names;
    if (!Array.isArray(names)) names = [names];
    res.json(await repo.countByNames(names));
}

export const findByMinScore = async (req, res) => {
    const exam = req.params.exam;
    const minScore = +req.params.minScore;
    const students = await repo.findByMinScore(exam, minScore);
    const studentsWithoutPasswords = students.map(student => ({...student, password: undefined}))
    res.json(studentsWithoutPasswords);
}