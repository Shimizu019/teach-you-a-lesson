// Classrooms — teacher view: all classrooms + Create Class flow.
// Frontend-only: created classes live in local React state.
import { useState } from 'react';
import PlaceholderDialog from '../../components/common/PlaceholderDialog';
import { ArrowRightIcon, PlusIcon } from '../../components/common/Icons';
import type { Classroom } from './types';

interface CreateClassDialogState {
  isOpen: boolean;
  className: string;
  section: string;
  grade: string;
  description: string;
}

function generateJoinCode(name: string, existing: Classroom[]): string {
  const prefix = name.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 4) || 'CLASS';
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
    const code = `${prefix}${suffix}`;
    if (!existing.some((cls) => cls.joinCode.toUpperCase() === code)) {
      return code;
    }
  }
  return `${prefix}${Date.now().toString().slice(-4)}`;
}

interface ClassroomsProps {
  classrooms: Classroom[];
  onCreateClass: (classroom: Classroom) => void;
  onOpenClass?: (id: string) => void;
}

export default function Classrooms({ classrooms, onCreateClass, onOpenClass }: ClassroomsProps) {
  const [createDialog, setCreateDialog] = useState<CreateClassDialogState>({
    isOpen: false,
    className: '',
    section: '',
    grade: '',
    description: ''
  });
  const [createdClass, setCreatedClass] = useState<Classroom | null>(null);

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    const name = createDialog.className.trim();
    const section = createDialog.section.trim();
    if (!name || !section || !createDialog.grade) return;
    // Frontend-only: the new class is stored in local React state.
    const newClass: Classroom = {
      id: `class-${Date.now()}`,
      name,
      grade: Number(createDialog.grade),
      section,
      students: 0,
      lessons: 0,
      quizzes: 0,
      joinCode: generateJoinCode(name, classrooms),
      openClass: true,
      description: createDialog.description.trim() || undefined
    };
    onCreateClass(newClass);
    setCreateDialog({ isOpen: false, className: '', section: '', grade: '', description: '' });
    setCreatedClass(newClass);
  };

  const openCreateClassDialog = () => {
    setCreateDialog(prev => ({ ...prev, isOpen: true }));
  };

  const closeCreateClassDialog = () => {
    setCreateDialog(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
            My Classrooms
          </h2>
          <p className="text-sm text-neutral-500">
            Manage your classes, students, lessons, quizzes, activities, and attendance.
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={openCreateClassDialog}
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Create Class
            </button>
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {classrooms.map((cls) => (
          <article
            key={cls.id}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow duration-150 hover:shadow-md"
          >
            <div className="space-y-4">
              {/* Class Header */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
                    {cls.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-neutral-500">
                    <span>Grade {cls.grade} • </span>
                    <span>Section {cls.section}</span>
                  </div>
                  {cls.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-neutral-500">{cls.description}</p>
                  )}
                </div>
                <div className="text-right">
                  <div className="mb-2">
                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-600">
                      Class Code: {cls.joinCode}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenClass?.(cls.id)}
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-1 text-xs font-medium text-white hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                  >
                    <ArrowRightIcon className="mr-1 h-3 w-3" />
                    Open Class
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 text-sm text-neutral-500">
                <div>
                  <p className="font-medium">{cls.students}</p>
                  <p>Students</p>
                </div>
                <div>
                  <p className="font-medium">{cls.lessons}</p>
                  <p>Lessons</p>
                </div>
                <div>
                  <p className="font-medium">{cls.quizzes}</p>
                  <p>Quizzes</p>
                </div>
                <div className="col-span-2">
                  <p className="font-medium">Activities</p>
                  {/* Would show activity count in real implementation */}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Create Class Dialog */}
      {createDialog.isOpen && (
        <PlaceholderDialog
          title="Create New Class"
          description="Create a new classroom for your students. All data is frontend-only prototype data."
          onClose={closeCreateClassDialog}
        >
          <form onSubmit={handleCreateClass} className="space-y-4 mt-4">
            <div>
              <label htmlFor="class-name" className="block text-sm font-medium text-neutral-700 mb-1">
                Class Name
              </label>
              <input
                id="class-name"
                type="text"
                value={createDialog.className}
                onChange={(e) => setCreateDialog(prev => ({ ...prev, className: e.target.value }))}
                placeholder="e.g., BSIT 1-1"
                className="block w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                required
              />
            </div>
            <div>
              <label htmlFor="section" className="block text-sm font-medium text-neutral-700 mb-1">
                Section
              </label>
              <input
                id="section"
                type="text"
                value={createDialog.section}
                onChange={(e) => setCreateDialog(prev => ({ ...prev, section: e.target.value }))}
                placeholder="e.g., 1-1"
                className="block w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                required
              />
            </div>
            <div>
              <label htmlFor="grade" className="block text-sm font-medium text-neutral-700 mb-1">
                Grade Level
              </label>
              <select
                id="grade"
                value={createDialog.grade}
                onChange={(e) => setCreateDialog(prev => ({ ...prev, grade: e.target.value }))}
                className="block w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                required
              >
                <option value="">Select Grade</option>
                <option value="1">Grade 1</option>
                <option value="2">Grade 2</option>
                <option value="3">Grade 3</option>
                <option value="4">Grade 4</option>
                <option value="5">Grade 5</option>
                <option value="6">Grade 6</option>
                <option value="7">Grade 7</option>
                <option value="8">Grade 8</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                id="description"
                rows={3}
                value={createDialog.description}
                onChange={(e) => setCreateDialog(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the class..."
                className="block w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={closeCreateClassDialog}
                className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Create Class
              </button>
            </div>
          </form>
        </PlaceholderDialog>
      )}

      {/* Class created success dialog with generated code */}
      {createdClass && (
        <PlaceholderDialog
          title="Class created"
          description={`“${createdClass.name}” has been added to your classrooms. Share this class code with your students so they can join.`}
          onClose={() => setCreatedClass(null)}
        >
          <div className="mt-4 rounded-xl border border-dashed border-indigo-300 bg-indigo-50 p-4 text-center">
            <p className="text-xs font-medium uppercase tracking-wider text-indigo-500">
              Class Code
            </p>
            <p className="mt-1 text-2xl font-bold tracking-widest text-indigo-700">
              {createdClass.joinCode}
            </p>
          </div>
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={() => setCreatedClass(null)}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              Got it
            </button>
          </div>
        </PlaceholderDialog>
      )}
    </div>
  );
}