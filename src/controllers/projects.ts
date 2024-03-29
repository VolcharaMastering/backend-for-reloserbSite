import mongoose from 'mongoose';
import NotFound from '../errors/notFound';
import IncorrectData from '../errors/requestError';
import ServerError from '../errors/serverError';
import Project from '../models/Projects';
import { OK_CODE, CODE_CREATED } from '../states/states';
import { forFunction, ProjectBody } from './types';

export const getProjects: forFunction = async (req, res, next) => {
  try {
    const projects = await Project.find({});
    if (!projects) {
      next(NotFound('There is no users'));
      return;
    }
    res.status(OK_CODE).send(projects);
  } catch (e) {
    next(ServerError('Some bugs on server'));
  }
};

export const addProjects: forFunction = async (req, res, next) => {
  
    const requestBody = req.body as unknown as ProjectBody;
    if (typeof requestBody !== 'object' ||
        typeof requestBody.projectName !== 'string' ||
        typeof requestBody.projectType !== 'string' ||
        typeof requestBody.projectCalls !== 'number') {
      next(IncorrectData('The request body must be an object with projectName, projectType and projectCalls properties.'));
      return;
    }
    try {
      const project = await new Project(requestBody).save();
      res.status(CODE_CREATED).send({ data: project });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        next(IncorrectData('Validation error'));
        return;
      } 
    //   else if (error.code === 11000) {
    //     next(ConflictError('The project with the same name is created.'));
    //     return;
    //   } 
      else {
        next(ServerError('Some bugs on server'));
        return;
      }
    };
  };

