export default class Debug
{
    constructor()
    {
        this.active = true

        if(this.active)
        {
            const GUI = lil.GUI;
            this.ui = new GUI();
        }
    }
}