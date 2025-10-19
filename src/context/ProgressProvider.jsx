// Developer's Notes: Progress Tracking on the front-end side does mostly work,
// but needs to be refined further to eliminate the bug that increasingly add 
// more console error messages in the Console! For now, is not used.

// "Manager" responsible for saved progress tracking for each member through onboarding pages!
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ProgressContext } from './ProgressContext';
import { useAuth } from './useAuth';
import moduleMap from '../config/moduleMap';

export const ProgressProvider = ({ children }) => {
    const { member } = useAuth();
    const [progress, setProgress] = useState({});

    // Load stored progress for this member
    useEffect(() => {
        if (!member?.memberId) return;
        const stored = sessionStorage.getItem(`progress_${member.memberId}`);
        if (stored) {
            try { setProgress(JSON.parse(stored)); }
            catch { setProgress({}); }
        } else {
            setProgress({});
        }
    }, [member?.memberId]);

    // Persist progress whenever it changes
    useEffect(() => {
        if (!member?.memberId) return;
        sessionStorage.setItem(
            `progress_${member.memberId}`,
            JSON.stringify(progress)
        );
    }, [progress, member?.memberId]);




    const getTaskKey = (block, sub, title) => `${block}_${sub}_${title}`;
    const getSubKey = (block, sub) => `${block}_${sub}`;

    const updateTaskProgress = (block, sub, title, action, data) => {
        const key = getTaskKey(block, sub, title);
        setProgress(prev => {
            const p = { ...prev };
            p.tasks = p.tasks || {};
            p.tasks[key] = p.tasks[key] || {};
            p.tasks[key][action] = data;
            return p;
        });
    };

    const getTaskProgress = (block, sub, title) => {
        const key = getTaskKey(block, sub, title);
        return progress.tasks?.[key] || {};
    };

    const isTaskCompleted = (block, sub, task) => {
        const prog = getTaskProgress(block, sub, task.taskTitle);
        for (const action of task.requiredActions || []) {
            switch (action) {
            case 'clickLinks': {
                const req = (task.links||[]).filter(l=>l.required);
                const done = new Set(prog.clickedLinks||[]);
                if (req.some(l=>!done.has(l.label))) return false;
                break;
            }
            case 'watchVideos': {
                const req = (task.videos||[]).filter(v=>v.required);
                const done = new Set(prog.watchedVideos||[]);
                if (req.some(v=>!done.has(v.title))) return false;
                break;
            }
            case 'readDocuments': {
                const req = (task.documents||[]).filter(d=>d.required);
                const done = new Set(prog.readDocuments||[]);
                if (req.some(d=>!done.has(d.title))) return false;
                break;
            }
            case 'completeQuiz': {
                if (!prog.quizCompleted) return false;
                break;
            }
            case 'uploadFiles': {
                if (!prog.uploadCompleted) return false;
                break;
            }
            default: break;
            }
        }
        return true;
    };

    // const isSubmoduleCompleted = (block, sub, tasks) =>
    //     tasks.every(t => isTaskCompleted(block, sub, t));

    const markSubmoduleVisited = (block, sub) => {
        const key = getSubKey(block, sub);
        setProgress(prev => {
            const p = { ...prev };
            p.visited = p.visited || {};
            p.visited[key] = true;
            return p;
        });
    };

    const isSubmoduleCompleted = (block, sub, tasks) => {
        const key = getSubKey(block, sub);
        
        // If there are tasks, check if all are completed
        if (tasks.length > 0) {
            return tasks.every(t => isTaskCompleted(block, sub, t));
        }
        
        // If no tasks, check if visited
        return progress.visited?.[key] || false;
    };

    // const isModuleCompleted = (block, modNum) => {
    //     const gm = moduleMap[block]?.groups[`Module ${modNum}`] || [];
    //     return gm.every(sub => progress.submodules?.[getSubKey(block, sub)]);
    // };

    const isModuleCompleted = (block, submodules) => {
    // submodules is an array of sub-IDs
        return Array.isArray(submodules)
            && submodules.length > 0
            && submodules.every(subId =>
            Boolean(progress.submodules?.[`${block}_${subId}`])
        );
    };


    // const isBlockCompleted = block => {
    //     const groups = moduleMap[block]?.groups || {};
    //     return Object.keys(groups).every(mk => {
    //         const num = mk.split(' ')[1];
    //         return isModuleCompleted(block, num);
    //     });
    // };

    const isBlockCompleted = blockKey => {
        const groups = moduleMap[blockKey]?.groups || {};
        return Object.values(groups).every(subArr =>
            subArr.length > 0 && subArr.every(subId =>
                Boolean(progress.submodules?.[`${blockKey}_${subId}`])
            )
        )
    };

    const updateSubmoduleCompletion = (block, sub, tasks) => {
        const key = getSubKey(block, sub);
        setProgress(prev => {
            const p = { ...prev };
            p.submodules = p.submodules || {};
            p.submodules[key] = isSubmoduleCompleted(block, sub, tasks);
            return p;
        });
    };

    return (
        <ProgressContext.Provider value={{
            progress,
            updateTaskProgress,
            getTaskProgress,
            isTaskCompleted,
            isSubmoduleCompleted,
            isModuleCompleted,
            isBlockCompleted,
            updateSubmoduleCompletion,
            markSubmoduleVisited
        }}>
            {children}
        </ProgressContext.Provider>
    );
};

ProgressProvider.propTypes = {
    children: PropTypes.node.isRequired,
};