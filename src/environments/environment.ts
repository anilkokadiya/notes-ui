const notesGeneralUrl = "http://localhost:8080/api/notes";

export const environment = {

  qa: false,
  production: false,
  notesUrl: notesGeneralUrl,
  addNoteUrl: notesGeneralUrl+'/add',
  updateNoteUrl: notesGeneralUrl+'/update',
  deleteNoteUrl: notesGeneralUrl+'/delete'
};