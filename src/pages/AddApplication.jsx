import { useEffect, useState } from 'react';
import { useApplications } from '../hooks/useApplications';
import { useNavigate, useParams } from 'react-router-dom';
import { generateId } from '../utils/helpers';
import { motion } from 'framer-motion';

import { useForm as useRHForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  company: yup.string().required('Company name is required'),
  role: yup.string().required('Role is required'),
  location: yup.string().required('Location is required'),
  salary: yup.number().typeError('Must be a number').nullable(),
  platform: yup.string().required('Platform is required'),
  status: yup.string().required('Status is required'),
  appliedDate: yup.date().typeError('Valid date required').required('Applied date is required'),
  interviewDate: yup.date().nullable().typeError('Valid date required'),
  notes: yup.string()
}).required();

const AddApplication = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { applications, addApplication, updateApplication } = useApplications();
  const [initDone, setInitDone] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue } = useRHForm({
    resolver: yupResolver(schema),
    defaultValues: {
      status: 'Applied',
      platform: 'LinkedIn',
      location: 'Remote'
    }
  });

  useEffect(() => {
    if (isEditing && applications.length > 0) {
      const appToEdit = applications.find(a => a.id === id);
      if (appToEdit) {
        // format dates for input type date
        const formatForInput = (dateStr) => {
          if (!dateStr) return '';
          try { return new Date(dateStr).toISOString().split('T')[0]; }
          catch(e) { return dateStr; }
        }
        
        setValue('company', appToEdit.company);
        setValue('role', appToEdit.role);
        setValue('location', appToEdit.location);
        setValue('salary', appToEdit.salary);
        setValue('platform', appToEdit.platform);
        setValue('status', appToEdit.status);
        setValue('appliedDate', formatForInput(appToEdit.appliedDate));
        setValue('interviewDate', formatForInput(appToEdit.interviewDate));
        setValue('notes', appToEdit.notes || '');
      }
      setInitDone(true);
    } else {
      setValue('appliedDate', new Date().toISOString().split('T')[0]);
      setInitDone(true);
    }
  }, [id, applications, isEditing, setValue]);

  const onSubmit = (data) => {
    // Stringify dates properly before saving
    const applicationData = {
      ...data,
      appliedDate: data.appliedDate.toISOString(),
      interviewDate: data.interviewDate ? data.interviewDate.toISOString() : null
    };

    if (isEditing) {
      updateApplication(id, { ...applications.find(a => a.id === id), ...applicationData });
    } else {
      addApplication({ id: generateId(), bookmarked: false, ...applicationData });
    }
    navigate('/applications');
  };

  if (isEditing && !initDone) return <div>Loading...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ maxWidth: '800px', margin: '0 auto' }}
    >
      <header className="mb-8">
        <h1>{isEditing ? 'Edit Application' : 'Add Application'}</h1>
        <p>{isEditing ? 'Update your job application details.' : 'Track a new opportunity in your pipeline.'}</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="glass-panel" style={{ padding: '2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          
          <div className="form-group">
            <label className="form-label">Company Name *</label>
            <input {...register("company")} className="form-input" placeholder="e.g. Google" />
            <span className="form-error">{errors.company?.message}</span>
          </div>

          <div className="form-group">
            <label className="form-label">Job Role *</label>
            <input {...register("role")} className="form-input" placeholder="e.g. Senior Frontend Engineer" />
            <span className="form-error">{errors.role?.message}</span>
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <select {...register("location")} className="form-select">
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
            <span className="form-error">{errors.location?.message}</span>
          </div>

          <div className="form-group">
            <label className="form-label">Salary / Compensation limit</label>
            <input type="number" {...register("salary")} className="form-input" placeholder="e.g. 120000" />
            <span className="form-error">{errors.salary?.message}</span>
          </div>

          <div className="form-group">
            <label className="form-label">Platform</label>
            <select {...register("platform")} className="form-select">
              <option value="LinkedIn">LinkedIn</option>
              <option value="Company Website">Company Website</option>
              <option value="Referral">Referral</option>
              <option value="Indeed">Indeed</option>
              <option value="Other">Other</option>
            </select>
            <span className="form-error">{errors.platform?.message}</span>
          </div>

          <div className="form-group">
            <label className="form-label">Status *</label>
            <select {...register("status")} className="form-select">
              <option value="Applied">Applied</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
            <span className="form-error">{errors.status?.message}</span>
          </div>

          <div className="form-group">
            <label className="form-label">Applied Date *</label>
            <input type="date" {...register("appliedDate")} className="form-input" />
            <span className="form-error">{errors.appliedDate?.message}</span>
          </div>

          <div className="form-group">
            <label className="form-label">Interview Date</label>
            <input type="date" {...register("interviewDate")} className="form-input" />
            <span className="form-error">{errors.interviewDate?.message}</span>
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '1.5rem' }}>
          <label className="form-label">Notes</label>
          <textarea {...register("notes")} className="form-textarea" rows="4" placeholder="Any details, contact info, or thoughts..."></textarea>
          <span className="form-error">{errors.notes?.message}</span>
        </div>

        <div className="flex justify-between items-center mt-8 pt-6" style={{ borderTop: '1px solid var(--glass-border)' }}>
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Add Application')}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddApplication;
