export class Local {
    public id: string;
    public lat: string;
    public lon: string;
    public titulo: string;
    public descricao: string;

    constructor(obj?: Partial<Local>) {
        if (obj) {
            this.id = obj.id
            this.lat = obj.lat
            this.lon = obj.lon
            this.titulo = obj.titulo
            this.descricao = obj.descricao
        }
    }

    toFirestore() {
        const usuario = {
            id: this.id,
            lat: this.lat,
            lon: this.lon,
            titulo: this.titulo,
            descricao: this.descricao
        }
        return usuario
    }


    toString() {
        const Objeto = `{
            "id": "${this.id}",
            "lat": "${this.lat}",
            "lon": "${this.lon}",
            "titulo": "${this.titulo}"
            "descricao": "${this.descricao}"
        }`
        return Objeto
    }
};