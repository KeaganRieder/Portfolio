
import githubIcon from '../../assets/apps/github.png';
import linkedinIcon from '../../assets/apps/linkedin.png';
import textDocIcon from '../../assets/apps/text_doc.png';

import resume from '../../assets/job_mat/resume.pdf';
import artistCV from '../../assets/job_mat/artistCv.pdf';

import { downloadFile, openLinkInNewTab } from "../../components/shortcut/clickActions";

import type { ShortcutDefinition } from "../../components/shortcut/definition";

export const ShortcutRegistry: Record<string, ShortcutDefinition> = {
    "github": {
        id: "github-shortcut",
        appName: "github",
        iconPath: githubIcon,
        parent: null,
        onClickAction:openLinkInNewTab("https://github.com/KeaganRieder")

    },
    "linkedin": {
        id: "linkedin-shortcut",
        appName: "linkedin",
        iconPath: linkedinIcon,
        parent: null,
        onClickAction: openLinkInNewTab("https://www.linkedin.com/in/keagan-rieder/")
    },
    "resume": {
        id: "resume-shortcut",
        appName: "resume",
        iconPath: textDocIcon,
        parent: null,
        onClickAction: downloadFile(resume, 'KeaganRieder-Resume.pdf')
    },
    "artist_cv": {
        id: "artist-cv-shortcut",
        appName: "artist_cv",
        iconPath: textDocIcon,
        parent: null,
        onClickAction: downloadFile(artistCV, 'KeaganRieder-ArtistCv.pdf')
    }
}
