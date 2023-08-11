import { ProjectForm } from "../components"


export const NewProject = () => {
    return (
        <>
            <h1 className="font-bold text-slate-800 text-2xl sm:text-3xl">Nuevo proyecto</h1>
            <section className="grid place-items-center mt-6 sm:mt-12">
                <ProjectForm />
            </section>
        </>

    )
}
