import { useState } from 'react';
import FileUpload from './FileUpload';

const SubmissionForm = () => {
  const [fullName, setFullName] = useState('');
  const [eid, setEid] = useState('');
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitResult(null);

    // Simulate submission (replace with actual API/email logic)
    setTimeout(() => {
      setSubmitting(false);
      setSubmitResult('Submission successful! Thank you.');
      setFullName('');
      setEid('');
      setFiles([]);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="submission-form max-w-lg mx-auto p-4 bg-white rounded shadow">
      <label className="block mb-2 font-semibold" htmlFor="fullName">Full Name</label>
      <input
        id="fullName"
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Enter your full name"
        disabled={submitting}
      />

      <label className="block mb-2 font-semibold" htmlFor="eid">EID</label>
      <input
        id="eid"
        type="text"
        value={eid}
        onChange={(e) => setEid(e.target.value)}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Enter your EID"
        disabled={submitting}
      />

      <FileUpload files={files} setFiles={setFiles} />

      <button
        type="submit"
        disabled={submitting || !fullName || !eid || files.length === 0}
        className={`w-full py-2 mt-6 rounded font-semibold text-white ${
          submitting || !fullName || !eid || files.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-prussian_blue hover:bg-[#00509e]'
        }`}
      >
        {submitting ? 'Submitting...' : 'Submit'}
      </button>

      {submitResult && <p className="mt-4 text-center text-prussian_blue font-semibold">{submitResult}</p>}
    </form>
  );
};

export default SubmissionForm;