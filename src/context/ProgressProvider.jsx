import { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { ProgressContext } from "./ProgressContext";
import { useAuth } from "./useAuth";
import moduleMap from "../config/moduleMap";

const emptyProgress = {
  tasks: {},
  submodules: {},
  visited: {},
};

const toArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (value instanceof Set) return Array.from(value);
  return [value];
};

const dedupe = (arr) => Array.from(new Set(arr.filter(Boolean)));

export const ProgressProvider = ({ children }) => {
  const { member } = useAuth();
  const eid = member?.eid;
  const storageKey = eid ? `progress_${eid}` : null;
  const [progress, setProgress] = useState(emptyProgress);

  useEffect(() => {
    if (!storageKey) return;
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      setProgress(emptyProgress);
      return;
    }
    try {
      setProgress(JSON.parse(raw));
    } catch {
      setProgress(emptyProgress);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [storageKey, progress]);

  const getTaskKey = useCallback((block, sub, title) => `${block}_${sub}_${title}`, []);
  const getSubKey = useCallback((block, sub) => `${block}_${sub}`, []);

  const updateTaskProgress = useCallback((block, sub, title, action, data) => {
    const key = getTaskKey(block, sub, title);
    setProgress((prev) => {
      const p = { ...prev, tasks: { ...(prev.tasks || {}) } };
      const t = { ...(p.tasks[key] || {}) };

      if (action === "clickedLinks") t.clickedLinks = dedupe(toArray(data));
      else if (action === "watchedVideos") t.watchedVideos = dedupe(toArray(data));
      else if (action === "readDocuments") t.readDocuments = dedupe(toArray(data));
      else if (action === "quizCompleted") t.quizCompleted = Boolean(data);
      else if (action === "uploadCompleted") t.uploadCompleted = Boolean(data);
      else t[action] = data;

      p.tasks[key] = t;
      return p;
    });
  }, [getTaskKey]);

  const getTaskProgress = useCallback((block, sub, title) => {
    const key = getTaskKey(block, sub, title);
    return progress.tasks?.[key] || {};
  }, [getTaskKey, progress.tasks]);

  const isTaskCompleted = useCallback((block, sub, task) => {
    const prog = getTaskProgress(block, sub, task.taskTitle);
    for (const action of task.requiredActions || []) {
      switch (action) {
        case "clickLinks": {
          const req = (task.links || []).filter((l) => l.required);
          const done = new Set(prog.clickedLinks || []);
          if (req.some((l) => !done.has(l.label))) return false;
          break;
        }
        case "watchVideos": {
          const req = (task.videos || []).filter((v) => v.required);
          const done = new Set(prog.watchedVideos || []);
          if (req.some((v) => !done.has(v.title))) return false;
          break;
        }
        case "readDocuments": {
          const req = (task.documents || []).filter((d) => d.required);
          const done = new Set(prog.readDocuments || []);
          if (req.some((d) => !done.has(d.title))) return false;
          break;
        }
        case "completeQuiz": {
          if (!prog.quizCompleted) return false;
          break;
        }
        case "uploadFiles": {
          if (!prog.uploadCompleted) return false;
          break;
        }
        default:
          return false;
      }
    }
    return true;
  }, [getTaskProgress]);

  const markSubmoduleVisited = useCallback((block, sub) => {
    const key = getSubKey(block, sub);
    setProgress((prev) => ({
      ...prev,
      visited: { ...(prev.visited || {}), [key]: true },
    }));
  }, [getSubKey]);

  const isSubmoduleCompleted = useCallback((block, sub, tasks) => {
    const key = getSubKey(block, sub);
    if (tasks.length > 0) {
      return tasks.every((t) => isTaskCompleted(block, sub, t));
    }
    return Boolean(progress.visited?.[key]);
  }, [getSubKey, isTaskCompleted, progress.visited]);

  const updateSubmoduleCompletion = useCallback((block, sub, tasks) => {
    const key = getSubKey(block, sub);
    const completed = isSubmoduleCompleted(block, sub, tasks);
    setProgress((prev) => {
      const current = Boolean(prev.submodules?.[key]);
      if (current === completed) return prev;
      return {
        ...prev,
        submodules: { ...(prev.submodules || {}), [key]: completed },
      };
    });
  }, [getSubKey, isSubmoduleCompleted]);

  const isModuleCompleted = useCallback((blockKey, moduleNumber) => {
    const groups = moduleMap[blockKey]?.groups || {};
    const subIds = groups[`Module ${moduleNumber}`] || [];
    const filtered = subIds.filter((id) => !String(id).endsWith("_0"));
    if (!filtered.length) return false;
    return filtered.every((subId) =>
      Boolean(progress.submodules?.[`${blockKey}_${subId}`])
    );
  }, [progress.submodules]);

  const isBlockCompleted = useCallback((blockKey) => {
    const groups = moduleMap[blockKey]?.groups || {};
    const moduleNums = Object.keys(groups).map((k) => k.split(" ")[1]).filter(Boolean);
    if (!moduleNums.length) return false;
    return moduleNums.every((num) => isModuleCompleted(blockKey, num));
  }, [isModuleCompleted]);

  const value = useMemo(() => ({
    progress,
    updateTaskProgress,
    getTaskProgress,
    isTaskCompleted,
    isSubmoduleCompleted,
    updateSubmoduleCompletion,
    markSubmoduleVisited,
    isModuleCompleted,
    isBlockCompleted,
  }), [
    progress,
    updateTaskProgress,
    getTaskProgress,
    isTaskCompleted,
    isSubmoduleCompleted,
    updateSubmoduleCompletion,
    markSubmoduleVisited,
    isModuleCompleted,
    isBlockCompleted,
  ]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};

ProgressProvider.propTypes = {
  children: PropTypes.node.isRequired,
};