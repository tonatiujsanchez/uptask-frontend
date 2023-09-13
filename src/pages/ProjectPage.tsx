import { useState, useEffect } from 'react'
import { Link, Navigate, useParams } from "react-router-dom"
import { useAdmin, useGetProject } from "../hooks"

import { CollaboratorsSection, LoadingMain, TasksSection } from "../components"
import { tabOptions } from "../constants"


export const ProjectPage = () => {

    const [selectedTab, setSelectedTab] = useState<string>(tabOptions[0].value)
    const [progress, setprogress] = useState(0)

    const { id } = useParams() as { id: string }    
    const { project, loading, loadingTasks, refreshTasks } = useGetProject(id)
    const { isAdmin } = useAdmin()

    useEffect(() => {
      
        if(project?.tasks && project?.tasks.total > 0){
            const current = (project.tasks.completedTasks / project.tasks.total) * 100            
            setprogress(current)
        }
        
    },[project])
    
    if(loading){
        return (
            <div className="h-screen flex justify-center items-center">
                <LoadingMain />
            </div>
        )
    }

    if(!project) {
        return ( <Navigate to={'/proyectos'} /> )
    }
        

    return (
        <div className="flex flex-col gap-5 pb-5">
            <div>
                <div className={`flex ${ isAdmin ? 'justify-between':'' } items-center gap-2`}>
                    <h1 className="flex items-center gap-1 font-bold text-slate-800">
                        <span className="text-2xl sm:text-3xl">{ project.name }</span> 
                    </h1>
                    {
                        isAdmin ?(
                            <Link 
                                to={`/proyectos/editar/${id}`} 
                                className="flex items-center gap-1 text-slate-400 hover:text-slate-800 font-medium"
                            >
                                <i className='bx bxs-edit' ></i> <span className="hidden sm:inline-flex">Editar</span>
                            </Link>
                        ):(
                            <p className="font-medium text-[0.8rem] px-3 py-[0.1rem] rounded-xl bg-slate-700 text-slate-100">Colaborador</p> 
                        )
                    }
                </div>
                <div dangerouslySetInnerHTML={{ __html: project.description }}></div>
                <div className="mt-2 pt-2 pb-4 border px-3 rounded-lg">
                    <p className="font-semibold text-slate-800 mb-4">Progreso</p>
                    <div className="bg-emerald-100 rounded-lg h-2 shadow-inner">
                        <div 
                            className={`relative bg-emerald-500 h-full rounded-lg transition-width duration-500`}
                            style={{ width: progress + '%' }}
                        >
                            <span className={`absolute ${ progress > 0 ? 'right-0' : 'left-0' } -top-5 font-medium text-slate-800 text-[0.9rem]`}>{ Math.floor( progress ) }%</span>
                        </div>
                    </div>
                </div>
            </div>
            <nav className={` sm:self-start flex gap-1 px-1 py-1 bg-slate-700/10 backdrop-blur-md rounded-lg`}>
                {
                    tabOptions.map( task => (
                        <button
                            key={ task.value }
                            onClick={ ()=> setSelectedTab( task.value ) } 
                            className={`${ selectedTab === task.value ? 'bg-white text-slate-800':'hover:bg-white/50 hover:text-slate-800' } flex-1 min-w-[9rem] px-3 py-2 text-slate-500 font-medium text-center rounded-lg transition-all`}
                        >
                            { task.text }
                        </button>
                    ))
                }
            </nav>
            {
                selectedTab === tabOptions[0].value && (
                    <TasksSection
                        projectTasks={ project.tasks }
                        loadingTasks={ loadingTasks }
                        refreshTasks={ refreshTasks }
                    />
                )
            }
            {
                selectedTab === tabOptions[1].value && (
                    <CollaboratorsSection
                        collaborators={ project.collaborators }
                    />
                )   
            }
            
        </div>
    )
}
