import { simpleGit, SimpleGit } from 'simple-git';

import { findModFolder, updateModFolder, checkForUpdates, keypress } from './lib';

const modFolder = findModFolder();

const checkAndUpdateMods = async (git: SimpleGit) => {
  const needsUpdates = await checkForUpdates(git);
  if (needsUpdates) {
    console.log('Updates found. Updating mods folder...');
    const updateResponse = await updateModFolder(git);
    if (updateResponse) {
      console.log('Update successful! 😊');
    } else {
      console.error('Update failed! 🥺 Contact Erika for support');
    }
  } else {
    console.log('No updates found. Looks like you\'re up to date! 😊');
  }


  setTimeout(() => {
    // end
  }, 8000);
}

if (modFolder) {
  const options = {
    baseDir: modFolder,
    binary: 'git',
    maxConcurrentProcesses: 6,
    trimmed: false,
  };
  const git: SimpleGit = simpleGit(options);
  checkAndUpdateMods(git);
} else {
  console.error('No mod folder found');
}


