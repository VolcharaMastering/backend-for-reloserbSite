import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  
    projectName: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [2, 'Minimum 2 characters'],
      maxlength: [120, 'Maximum 120 characters'],
    },
    projectType: {
      type: String,
      required: [true, 'Type is required'],
      minlength: [2, 'Minimum 2 characters'],
      maxlength: [120, 'Maximum 120 characters'],
    },
    projectCalls: {
      type: Number,
      default: 0
    },
    
  });
    
export default mongoose.model('project', projectSchema);
