import { NoteModules } from 'shared/enums';
import { ICreated, IFilter, IUpdated } from 'shared/interfaces/misc';

export interface INoteReference {
  id: string;
  module: NoteModules;
}

export interface INote {
  _id: string;
  updated: IUpdated;
  created: ICreated;
  note: string;
  tags: string[];
  reference: INoteReference;
  attachments: string[];
}

export interface INotesFilter extends IFilter {
  module?: NoteModules;
  id?: string;
}

export interface INotesSlice {
  notesFilter: INotesFilter;
  setNotesFilters: (newFilters: Partial<INotesFilter>) => void;
  resetNotesFilters: VoidFunction;
}

export interface INoteSchema {
  note: string;
  reference: INoteReference;
  tags: string[];
  attachments: string[];
}
