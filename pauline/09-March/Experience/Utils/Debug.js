
export default class Debug
{
    constructor()
    {
        this.active = window.location.hash === '#debug'

        if(this.active)
        {
            const GUI = lil.GUI;
            this.ui = new GUI();
        }
    }
}