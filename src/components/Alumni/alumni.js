import Profile from './Profile/Profile';
import ProfileDisplay from './ProfileDisplay/ProfileDisplay';
import Search from './Search/Search';
import Filter from './Filter/Filter';

/* 
    This is where each component under the Alumni directory 
    are imported and then exported, so other components 
    outside the Alumni page can import with a more simpler 
    import command by importing the specified components 
    from this file!

    This is one example of import command I was talking about:
    import { Profile, ProfileDisplay, Search, Filter } from './alumni';
*/

export { Profile, ProfileDisplay, Search, Filter };

const AlumniComponents = {
    Profile,
    ProfileDisplay,
    Search,
    Filter
};

export default AlumniComponents;