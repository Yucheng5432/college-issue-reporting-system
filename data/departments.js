const mongoCollections = require('../config/mongoCollections');
const departments = mongoCollections.departments;
const objectI = require("mongodb").ObjectID;
const { ObjectID } = require("bson");
/**
 * Retrieve a department having a particular ID.
 * @param {Object ID} deptID ID of the department to retrieve
 * @return {Department} Department object having given ID
 */
async function getDepartment(deptID) {
    if(typeof deptID!= 'string'){
        throw `Department id must be a string`
    }
    if(!deptID ) {
        throw "Department ID is invalid."
    }
    if(!deptID.match(/^[0-9a-fA-F]{24}$/)){
        throw `Not a valid object id`
    }
    id = ObjectID(deptID)
     try {
        const departmentCollection = await departments();
        const department = await departmentCollection.findOne({ _id: id });
        if (!department) {
            throw `Department having ID ${deptID} does not exist.`
        }
        console.log(department)
        return department;
     } catch(error) {
         throw error;
     }
}

/**
 * Retrieve a department having a particular name.
 * @param {String} departmentName The name of the department to retrieve
 * @return {Department} Department object having given name
 */
async function getDepartmentByName(departmentName) {
    if(!departmentName || typeof(departmentName)!= "string" || departmentName.length==0) {
        throw "Department is invalid or empty.";
    }
 
     try {
        const departmentCollection = await departments();
        const department = await departmentCollection.findOne({ name: departmentName});
        if (!department) {
            throw `Department ' ${departmentName} ' does not exist.`;
        }
        console.log(department)
        return department;
     } catch(error) {
         throw error
     }
}

/**
 * Create a new post with the provided name.
 * @param {String} departmentName The name of the department added 
 * @return {Department} Newly added department object
 */
async function createDepartment(departmentName) {
    if(!departmentName || typeof(departmentName)!= "string" || departmentName.length==0) {
        throw "Department is invalid or empty.";
    }
   
    try {
        const departmentCollection = await departments();
        let newDepartment = {
            name: departmentName
        }
        const addNewDept = await departmentCollection.insertOne(newDepartment); 

        if(!addNewDept || addNewDept.insertedCount == 0) { //Verify if department was added
            throw "Department was not added.";
        }else{
            console.log(newDepartment)
            // return 'New Department'
        }
    
         //Return newly added department
    } catch(error) {
         throw error;
     }
}
 /**
  * Retrieve all the department objects in the collection.
  * @return {Array} An array of the department objects in the collection
  */
async function getAllDepartments() {
    // if (arguments.length != 0) { //validates number of arguments
    //     throw new Error("Incorrect number of arguments.");
    // }

    try {
        const departmentCollection = await departments();
        const allDepartments = await departmentCollection.find({}).toArray();
        // console.log(allDepartments)
        return allDepartments;
    } catch(error) {
        throw error;
    }
}
/**
 * Delete a department having the provided ID
 * @param {Object ID} departmentID 
 * @return {Department} Deleted department object
 */
async function deleteDepartment(departmentID) {
    if(!departmentID) {
        throw "Department ID is invalid.";
    }
    try{
        const departmentCollection = await departments();
        let id = ObjectID(departmentID)
        // const deptToDelete = await this.getDepartment(departmentID); //Get details of department to delete
        const findDept = await departmentCollection.findOne({_id: id})
        if(!findDept){
            throw `There is no department with department id ${departmentID}`
        } 
        const department = await departmentCollection.deleteOne({ _id: id });
   
        if (!department || department.deletedCount == 0) {
            throw `Department with ID ${departmentID} was not deleted.`;
        }
        // console.log(department)
        return department;
    } catch(error) {
        throw error;
    }
}


module.exports = {
    getDepartment, getDepartmentByName, createDepartment, getAllDepartments, deleteDepartment
}
