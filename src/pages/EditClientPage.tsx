/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ClientsService } from '../services/ClientsService';

export default function EditClientPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState({
        name: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        ClientsService.getClient(Number(id)).then(setClient);
    }, []);

    const save = async () => {
    const { name, email, phone } = client;
    await ClientsService.updateClient(Number(id), { name, email, phone });
    navigate('/clients');
};

    return (
        <div className="container mt-4">
            <h2>Editar Cliente</h2>
            <input className="form-control mb-2" placeholder="Nombre" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} />
            <input className="form-control mb-2" placeholder="Email" value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} />
            <input className="form-control mb-2" placeholder="Teléfono" value={client.phone} onChange={(e) => setClient({ ...client, phone: e.target.value })} />
            <button className="btn btn-success" onClick={save}>Guardar cambios</button>
        </div>
    );
}