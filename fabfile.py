"""
Deploy tasks
"""
from fabric.api import env, run, cd
from fabric.main import load_settings

SETTINGS = load_settings('./.fabricrc')
if not SETTINGS:
    raise RuntimeError('.fabricrc is needed')
env.update(SETTINGS)

def deploy():
    """ Deploy task """
    with cd(env.project_path):
        run('git pull origin master')
        run('composer install')
        run('php artisan migrate')
