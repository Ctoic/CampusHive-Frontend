import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle,
  Loader2,
  Download,
  Eye,
  Trash2
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import apiClient from '../../lib/api';

const ExamUpload = () => {
  const [uploadedExams, setUploadedExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Upload form state
  const [courseName, setCourseName] = useState('');
  const [examType, setExamType] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    loadUploadedExams();
  }, []);

  const loadUploadedExams = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.getUploadedExams();
      setUploadedExams(data);
    } catch (err) {
      console.error('Failed to load uploaded exams:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files && event.target.files[0] ? event.target.files[0] : null;
    if (!file) {
      setSelectedFile(null);
      return;
    }
    const isPdf = file.type === 'application/pdf' || (file.name || '').toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      setSelectedFile(null);
      setError('Please select a PDF file');
      return;
    }
    setSelectedFile(file);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile || !courseName.trim() || !examType.trim()) {
      setError('Please fill in all fields and select a file');
      return;
    }

    try {
      setUploading(true);
      setError(null);
      setSuccess(null);

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('course_name', courseName.trim());
      formData.append('exam_type', examType.trim());

      const result = await apiClient.uploadExam(formData);
      
      setSuccess(`Exam uploaded successfully! Upload ID: ${result.data.upload_id}`);
      
      // Reset form
      setCourseName('');
      setExamType('');
      setSelectedFile(null);
      document.getElementById('file-input').value = '';
      
      // Reload exams list
      await loadUploadedExams();
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processed':
        return <CheckCircle className="h-5 w-5 text-gray-300" />;
      case 'processing':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'processed':
        return <Badge className="bg-white/10 text-white border-white/10">Processed</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Processing</Badge>;
      case 'failed':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Failed</Badge>;
      default:
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
        <span className="ml-2 text-white">Loading exam data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <Card className="bg-black border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-white">
              <AlertCircle className="h-5 w-5" />
              <span>Error: {error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {success && (
        <Card className="bg-black border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-white">
              <CheckCircle className="h-5 w-5" />
              <span>{success}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Form */}
      <Card className="bg-black border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Upload Exam</CardTitle>
          <CardDescription className="text-white">
            Upload a new exam PDF file for processing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="course-name" className="text-gray-300">Course Name</Label>
              <Input
                id="course-name"
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="e.g., Computer Science 101"
                className="bg-white/10 border-white/10 text-white placeholder-gray-400 focus:ring-0"
              />
            </div>
            <div>
              <Label htmlFor="exam-type" className="text-gray-300">Exam Type</Label>
              <Input
                id="exam-type"
                type="text"
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                placeholder="e.g., Midterm, Final, Quiz"
                className="bg-white/10 border-white/10 text-white placeholder-gray-400 focus:ring-0"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="file-input" className="text-gray-300">PDF File</Label>
            <Input
              id="file-input"
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="bg-white/10 border-white/10 text-white file:bg-white/10 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4"
            />
            {selectedFile && (
              <p className="text-sm text-gray-400 mt-1">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>
          
          <Button 
            onClick={handleUpload}
            disabled={uploading || !selectedFile || !courseName.trim() || !examType.trim()}
            className="w-full bg-[#60a5fa] text-black hover:bg-[#93c5fd]"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Exam
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Uploaded Exams List */}
      <Card className="bg-black border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Uploaded Exams</CardTitle>
              <CardDescription className="text-white">
                Manage and monitor uploaded exam files
              </CardDescription>
            </div>
            <Button 
              onClick={loadUploadedExams}
              variant="outline"
              className="bg-[#60a5fa] text-black hover:bg-[#93c5fd] border-transparent"
            >
              <Upload className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {uploadedExams.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No exams uploaded yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Filename</TableHead>
                    <TableHead className="text-gray-300">Course</TableHead>
                    <TableHead className="text-gray-300">Type</TableHead>
                    <TableHead className="text-gray-300">Uploaded</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uploadedExams.map((exam) => (
                    <TableRow key={exam.id} className="border-white/10">
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(exam.status)}
                          <Badge className="bg-white/10 text-white border-white/10">{exam.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-white font-mono text-sm">
                        {exam.filename}
                      </TableCell>
                      <TableCell className="text-white">
                        {exam.course_name}
                      </TableCell>
                      <TableCell className="text-white">
                        {exam.exam_type}
                      </TableCell>
                      <TableCell className="text-gray-400 text-sm">
                        {formatDate(exam.uploaded_at)}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white/10"
                            onClick={() => {
                              // View file details or download
                              console.log('View exam:', exam);
                            }}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white/10"
                            onClick={() => {
                              // Download file
                              const link = document.createElement('a');
                              link.href = exam.file_path;
                              link.download = exam.filename;
                              link.click();
                            }}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamUpload;
