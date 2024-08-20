class UpdateStateRequest{
    id: string
    state: string;
    constructor(id: string, state: string)
    {
        this.id = id;
        this.state = state;
    }
}
export default UpdateStateRequest;