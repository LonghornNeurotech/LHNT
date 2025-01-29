/* 
    This is where each component under the Alumni directory 
    are imported and then exported, so other components 
    outside the Alumni page can import with a more simpler 
    import command by importing the specified components 
    from this file!

    This is one example of import command I was talking about:
    import { Profile, ProfileDisplay, Search, Filter } from './alumni';
*/

export { default as Profile } from './Profile/Profile';
export { default as ProfileDisplay } from './ProfileDisplay/ProfileDisplay';
export { default as Search } from './Search/Search';
export { default as Filter } from './Filter/Filter';
