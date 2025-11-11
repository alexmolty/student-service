import * as repo from "../repository/studentRepository.js"


export const addStudent = (req, res) => {
    const success = repo.addStudent(req.body);
    if(success) {
        res.status(204).send();
    } else {
        res.status(409).send();
    }
}

export const findStudent = (req, res) => {
    const student = repo.findStudent(+req.params.id);
    if(student) {
        const {password, ...studentWithoutPassword} = student;
        res.json(studentWithoutPassword);
    } else {
        res.status(404).send();
    }
}

export const deleteStudent = (req, res) => {
    const id = +req.params.id;
    const student = repo.findStudent(id);
    if(student) {
        const {password, ...studentWithoutPassword} = student;
        res.json(studentWithoutPassword);
        repo.deleteStudent(id)
    } else {
        res.status(404).send();
    }
}

export const updateStudent = (req, res) => {
    const id = +req.params.id;
    const student = repo.findStudent(id);
    if(student) {
        repo.updateStudent(id, req.body)
        const {scores, ...studentWithoutScores} = student;
        res.json(studentWithoutScores);
    } else {
        res.status(404).send();
    }
}

export const addScore = (req, res) => {
    const id = +req.params.id;
    const student = repo.findStudent(id);
    if(student) {
        repo.addScore(id, req.body);
        res.json(req.body)
    } else {
        res.status(404).send();
    }
}

export const findStudentsByName = (req, res) => {
    const students = repo.findStudentByName(req.params.name);
    res.json(students);
}

export const countByNames = (req, res) => {
    let names = req.query.names;
    if(!Array.isArray(names)) names = [names];
    res.json(repo.countByNames(names));
}

export const findByMinScore = (req, res) => {
    const exam = req.params.exam;
    const minScore = req.params.minScore;
    const students = repo.findByMinScore(exam, minScore);
    res.json(students);
}