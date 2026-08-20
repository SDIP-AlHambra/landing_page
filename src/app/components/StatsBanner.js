"use client";
import React from 'react';
import styles from './StatsBanner.module.css';
import { statsData } from '../../data/stats';

export default function StatsBanner() {
  return (
    <section className={styles.statsSection}>
      <div className="container">
        <div className={styles.grid}>
          {statsData.map((stat) => (
            <div key={stat.id} className={styles.statCard}>
              <div className={styles.numberWrapper}>
                <span className={styles.number}>{stat.value}</span>
                {stat.suffix && <span className={styles.suffix}>{stat.suffix}</span>}
              </div>
              <h3 className={styles.label}>{stat.label}</h3>
              <p className={styles.description}>{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
