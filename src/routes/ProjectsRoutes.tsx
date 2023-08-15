import { Navigate, Route, Routes } from "react-router-dom"

import { ProjectsLayout } from "../layouts"
import { NewProjectPage, ProjectPage, ProjectsPage } from "../pages"


export const ProjectsRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ProjectsLayout />}>
                <Route index element={<ProjectsPage />} />
                <Route path="nuevo-proyecto" element={<NewProjectPage />} />
                <Route path=":id" element={<ProjectPage />} />
                <Route path="/*" element={<Navigate to="/proyectos" />} />
            </Route>
        </Routes>
    )
}
