import axios from "axios";
import { showToastMsg } from "../helpers/show-toast-msg";
import { handleErrors } from "../helpers/handle-errors";

export async function getNotes() {
    try {
        const response = await axios.get('http://localhost:8080/api/notes', {
            withCredentials: true
        });

        const { data, status } = response;

        if (status >= 400) {
            console.log(data, status);
            return;
        }

        return data;

    } catch (error) {
        handleErrors(error);
    }
}

export async function createNote(title: string, description: string) {
    try {
        const response = await axios.post('http://localhost:8080/api/notes/', {
            title,
            description
        }, {
            withCredentials: true
        });

        const { data, status } = response;

        if (status >= 400) {
            console.log(data, status);
            return;
        }

        showToastMsg({ msg: 'Note successfully created', type: 'success', position: 'bottom-left', autoClose: 4000 });
        return data;

    } catch (error) {
        handleErrors(error);
    }
}

export async function updateNote(id: number, title: string, description: string) {
    try {
        const response = await axios.put(`http://localhost:8080/api/notes/${id}`, {
            title,
            description
        }, {
            withCredentials: true
        });

        const { data, status } = response;

        if (status >= 400) {
            console.log(data, status);
            return;
        }

        showToastMsg({ msg: 'Note successfully updated', type: 'success', position: 'bottom-left', autoClose: 4000 });
        return data;

    } catch (error) {
        handleErrors(error);
    }
}

export async function deleteNote(id: number) {
    try{
        const response = await axios.delete(`http://localhost:8080/api/notes/${id}`, {
            withCredentials: true
        });
    
        const { data, status } = response;
    
        if (status >= 400) {
            console.log(data, status);
            return;
        }
    
        showToastMsg({ msg: 'Note successfully deleted', type: 'success', position: 'bottom-left', autoClose: 4000 });
    
        return data;
    
    } catch (error) {
        handleErrors(error);
    }
}

export async function searchNotesByQuery(query: string) {
    try {
        const response = await axios.get(`http://localhost:8080/api/notes?query=${query}`, {
            withCredentials: true
        });

        const { data, status } = response;

        if (status >= 400) {
            console.log(data, status);
            return;
        }
        
        return data;

    } catch (error) {
        handleErrors(error);
    }
}