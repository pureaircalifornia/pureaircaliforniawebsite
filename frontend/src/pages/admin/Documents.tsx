import React, { useState, useEffect, useRef } from 'react';
import { FileText, Upload, Download, Loader2, File, X, CheckCircle } from 'lucide-react';
import { getDocuments, uploadDocument } from '@/utils/api';

export default function Documents() {
    const [documents, setDocuments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const [docName, setDocName] = useState('');
    const [docType, setDocType] = useState('w9');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchDocs = async () => {
        setLoading(true);
        try {
            const data = await getDocuments();
            setDocuments(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocs();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            if (!docName) {
                setDocName(e.target.files[0].name.split('.')[0]);
            }
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || !docName) return;
        setUploading(true);
        try {
            await uploadDocument(selectedFile, {
                name: docName,
                document_type: docType
            });
            setUploadSuccess(true);
            setTimeout(() => {
                setShowModal(false);
                setUploadSuccess(false);
                setSelectedFile(null);
                setDocName('');
                fetchDocs();
            }, 1500);
        } catch (err) {
            console.error('Upload failed:', err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage W9s, insurance, and compliance documents.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors"
                >
                    <Upload className="w-4 h-4" />
                    Upload Document
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
                </div>
            ) : documents.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <File className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents</h3>
                    <p className="text-sm text-gray-500">Upload documents to share them securely with customers.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {documents.map((doc) => (
                        <div key={doc.id || doc._id} className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <FileText className="w-8 h-8 text-sky-500" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-gray-900 truncate">{doc.name}</h4>
                                    <p className="text-xs text-gray-500 mt-1">Uploaded {new Date(doc.created_at || doc.uploaded_at).toLocaleDateString()}</p>
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 mt-2 uppercase">
                                        {doc.document_type || 'Document'}
                                    </span>
                                </div>
                                <a
                                    href={`http://localhost:8000${doc.file_url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-400 hover:text-sky-600 bg-gray-50 hover:bg-sky-50 rounded-lg flex-shrink-0"
                                >
                                    <Download className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-900">Upload Document</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-500">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            {uploadSuccess ? (
                                <div className="py-8 flex flex-col items-center justify-center text-green-600 text-center">
                                    <CheckCircle className="w-12 h-12 mb-3" />
                                    <h4 className="font-medium text-lg">Upload Complete!</h4>
                                    <p className="text-sm text-green-600/80">Your document has been securely saved.</p>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                                        <select
                                            value={docType}
                                            onChange={(e) => setDocType(e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 bg-white"
                                        >
                                            <option value="w9">W9 Form</option>
                                            <option value="insurance">Insurance Certificate</option>
                                            <option value="business_license">Business License</option>
                                            <option value="certification">Certification (e.g., NADCA)</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. 2026 W9 Form"
                                            value={docName}
                                            onChange={(e) => setDocName(e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50 hover:border-sky-500 transition-colors"
                                        >
                                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                            {selectedFile ? (
                                                <p className="text-sm font-medium text-sky-600 truncate px-4">{selectedFile.name}</p>
                                            ) : (
                                                <p className="text-sm text-gray-500">Click to browse or drag and drop<br /><span className="text-xs">PDF, PNG, JPG (Max 10MB)</span></p>
                                            )}
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                className="hidden"
                                                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        {!uploadSuccess && (
                            <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpload}
                                    disabled={uploading || !selectedFile || !docName}
                                    className="px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {uploading ? 'Uploading...' : 'Save Document'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
