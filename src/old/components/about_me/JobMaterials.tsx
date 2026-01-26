import React from "react";
import resume from '../../assets/job_mat/resume.pdf';
import artistCV from '../../assets/job_mat/artistCv.pdf';

import '../../styles/applications/AboutMe.css';


const JobMaterials: React.FC = () => {

    return (
        <>
            <div className="job-materials-container ">
                <h3> Looking for my Resume or Artist cv?</h3>
                <a href={resume} download="KeaganRieder-Resume.pdf">
                    <p>click here to download my Resume</p>
                </a>
                <a href={artistCV} download="KeaganRieder-ArtistCv.pdf">
                    <p>click here to download my Artist CV</p>
                </a>
            </div>
        </>

    );
}

export default JobMaterials;