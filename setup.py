#!/usr/bin/env python

from distutils.core import setup
from setuptools import find_packages

setup(name='troposphere',
      version='0.1',
      description='Atmosphere frontend',
      author='iPlant Collaborative',
      url='https://github.com/iPlantCollaborativeOpenSource/troposphere',
      packages=find_packages(),
      install_requires=[
          'Flask >= 0.10.1, < 0.11',
          'requests >= 2.2.1, < 2.3',
          'caslib >= 1.0.3, < 1.1',
          'jwt.py >= 0.1',
      ]
     )