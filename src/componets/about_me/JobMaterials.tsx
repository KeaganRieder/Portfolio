import React from "react";
import '../../styles/applications/AboutMe.css';
import resume from '../../assets/job_mat/resume.pdf';
import artistCV from '../../assets/job_mat/artistCv.pdf';


const JobMaterials: React.FC = () => {

    return (
        <>
            <div className="job-materials-container">
                <h3> Looking for my Resume or Artist cv?</h3>
                <a href={resume} download="KeaganRieder-Resume.pdf">
                    click here to download my Resume
                </a>
                <a href={artistCV} download="KeaganRieder-ArtistCv.pdf">
                    click here to download my Artist CV
                </a>
            </div>
        </>

    );
}

export default JobMaterials;