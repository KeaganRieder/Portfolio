/**
 * Represents a single skill/technology (e.g. Blender, C++, React) that can be attached to
 * project tags and referenced elsewhere in the site (skills list, project filtering).
 */
export type Skill = {
    id: string;
    name: string;
}

/**
 * Links a skill back to a specific project that demonstrates it, used to show example
 * projects when highlighting a given skill.
 */
export type skillExample = {
    projectId: string;
    projectName: string;

}
