import React, { useState, useEffect } from 'react';
import './UpgradeCodebase.css';

const UpgradeCodebase = () => {
    const [step, setStep] = useState(1);
    const [branchName, setBranchName] = useState('');
    const [customBranchName, setCustomBranchName] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [files, setFiles] = useState([
        { name: 'file1.py', status: 'Modified', action: null },
        { name: 'file2.js', status: 'Added', action: null },
        { name: 'file3.html', status: 'Deleted', action: null },
    ]);
    const [progress, setProgress] = useState([0, 0, 0, 0]);

    const handleBranchNameChange = (e) => setBranchName(e.target.value);
    const handleCustomBranchNameChange = (e) => setCustomBranchName(e.target.value);

    const handleFileAction = (fileName, action) => {
        setFiles(files.map(file =>
            file.name === fileName ? { ...file, action } : file
        ));
    };

    const startUpgradeProcess = () => {
        if (step === 1) {
            // Step 1 progress
            const interval1 = setInterval(() => {
                setProgress(prev => {
                    const newProgress = [...prev];
                    if (newProgress[0] >= 20) {
                        clearInterval(interval1);
                        setStep(2);
                        return newProgress;
                    }
                    newProgress[0] += 10;
                    return newProgress;
                });
            }, 200);

            // Step 2 progress (starts after step 1 completes)
            setTimeout(() => {
                const interval2 = setInterval(() => {
                    setProgress(prev => {
                        const newProgress = [...prev];
                        if (newProgress[1] >= 40) {
                            clearInterval(interval2);
                            setStep(3);
                            return newProgress;
                        }
                        newProgress[1] += 10;
                        return newProgress;
                    });
                }, 200);
            }, 2200);

            // Step 3 progress (starts after step 2 completes)
            setTimeout(() => {
                const interval3 = setInterval(() => {
                    setProgress(prev => {
                        const newProgress = [...prev];
                        if (newProgress[2] >= 70) {
                            clearInterval(interval3);
                            setStep(4);
                            return newProgress;
                        }
                        newProgress[2] += 10;
                        return newProgress;
                    });
                }, 200);
            }, 4400);

            // Step 4 progress (starts after step 3 completes)
            setTimeout(() => {
                const interval4 = setInterval(() => {
                    setProgress(prev => {
                        const newProgress = [...prev];
                        if (newProgress[3] >= 100) {
                            clearInterval(interval4);
                            return newProgress;
                        }
                        newProgress[3] += 10;
                        return newProgress;
                    });
                }, 200);
            }, 6600);
        }
    };

    const handleFileUpload = (e) => {
        const files = e.target.files || (e.dataTransfer?.files || []);
        if (files.length > 0) {
            setIsUploading(true);
            setTimeout(() => {
                setIsUploading(false);
                startUpgradeProcess(); // Automatically start the process after upload
            }, 2000);
        }
    };

    return (
        <div className="app-container">
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-left">
                    <span className="navbar-logo"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 8H6V24H10" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
                        <path d="M22 8H26V24H22" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
                    </svg></span>
                    <span className="navbar-title">CodeUpgrader</span>
                </div>
                <div className="navbar-right">
                    <button className="navbar-button">Dashboard</button>
                    <button className="navbar-button">Project</button>
                    <button className="navbar-button">Doc</button>


                    <div className="navbar-user"><svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="bell-icon"
                    >
                        <path
                            d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6981 21.5547 10.4458 21.3031 10.27 21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg></div>
                </div>
            </nav>

            <div className="upgrade-codebase-container">
                <div className="section">
                    <h1>Upgrade Codebase</h1>
                    <p>Standard Branch Name</p>
                    <div className="input-group">
                        <input
                            type="text"
                            value={branchName}
                            onChange={handleBranchNameChange}
                        // placeholder="Enter standard branch name"
                        />
                    </div>
                </div>

                {/* <div className="divider"></div> */}

                <div className="section">
                    <p>Custom Branch Name (Optional)</p>
                    <div className="input-group">
                        <input
                            type="text"
                            value={customBranchName}
                            onChange={handleCustomBranchNameChange}
                            placeholder="Enter custom branch name"
                        />
                    </div>
                    {/* <button className="secondary-button">Upgrade Branch Name</button> */}
                </div>
                {/* <div className="divider"></div> */}
                <div className="section">
                    <p>Upload Folder Zip (Optional)</p>
                    <div
                        className="upload-area"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            handleFileUpload(e);
                        }}
                    >
                        {isUploading ? (
                            <div className="upload-status">
                                <p>Uploading...</p>
                            </div>
                        ) : (
                            <>
                                <p>Drag and drop or click to upload</p>
                                <input
                                    type="file"
                                    id="file-upload"
                                    onChange={handleFileUpload}
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="file-upload" className="upload-button">
                                    Select File
                                </label>
                            </>
                        )}
                    </div>
                </div>

                <div className="progress-container">
                    <div className="progress-step">

                        <h3>{step === 1 ? 'Uploading...' : 'Uploaded'}</h3>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${progress[0]}%` }}
                            ></div>
                        </div>
                        <p className="pro"> Step 1 of 4</p>
                    </div>

                    <div className="progress-step">

                        <h3>{step === 2 ? 'Processing...' : step > 2 ? 'Processed' : 'Pending'}</h3>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${progress[1]}%` }}
                            ></div>
                        </div>
                        <p className="pro">Step 2 of 4</p>
                    </div>

                    <div className="progress-step">
                        <h3>{step === 3 ? 'Analyzing...' : step > 3 ? 'Analyzed' : 'Pending'}</h3>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${progress[2]}%` }}
                            ></div>
                        </div>
                        <p className="pro">Step 3 of 4</p>
                    </div>

                    <div className="progress-step">

                        <h3>{step === 4 ? 'Completed' : step > 4 ? 'completed' : 'Pending'}</h3>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${progress[3]}%` }}
                            ></div>
                        </div>
                    </div>
                    <p className="pro">Step 4 of 4</p>
                </div>

                <div className="modified-files">
                    <h2>Modified Files</h2>
                    <table>
                        <thead>
                            <tr className=''>
                                <th>File Name</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file) => (
                                <tr key={file.name}>
                                    <td>{file.name}</td>
                                    <td  className={`status-pill ${file.status.toLowerCase()}`}>{file.status}</td>
                                    <td className="actions">
                                        <button
                                            className={`action-button ${file.action === 'merge' ? 'selected' : ''}`}
                                            onClick={() => handleFileAction(file.name, 'merge')}
                                        >
                                            Merge
                                        </button>
                                        <div className='mer'>|</div>
                                        <button
                                            className={`action-button ${file.action === 'reject' ? 'selected' : ''}`}
                                            onClick={() => handleFileAction(file.name, 'reject')}
                                        >
                                            Reject
                                        </button>
                                        <div className='mer'>|</div>
                                        <button
                                            className={`action-button ${file.action === 'accept' ? 'selected' : ''}`}
                                            onClick={() => handleFileAction(file.name, 'accept')}
                                        >
                                            Accept
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default UpgradeCodebase;