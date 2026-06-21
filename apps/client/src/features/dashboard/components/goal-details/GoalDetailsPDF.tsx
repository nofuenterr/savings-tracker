import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';

import type { Projection } from '@savings-tracker/shared';

import currencyFormatter from '../../utils/currencyFormatter';
import type { GoalDetailsPDFProps } from '../../types/dashboardType';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    color: '#1a1a1a',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 11,
    color: '#666666',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginVertical: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    padding: 12,
  },
  statLabel: {
    fontSize: 9,
    color: '#888888',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  table: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
    marginBottom: 2,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tableRowAlt: {
    backgroundColor: '#fafafa',
  },
  colDate: { width: '20%' },
  colType: { width: '15%' },
  colNote: { width: '45%' },
  colAmount: { width: '20%', textAlign: 'right' },
  tableHeaderText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#666666',
    textTransform: 'uppercase',
  },
  deposit: { color: '#4ade80' },
  withdrawal: { color: '#f87171' },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 9,
    color: '#aaaaaa',
  },
  projectionBox: {
    backgroundColor: '#fff7ed',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  projectionText: {
    fontSize: 11,
    color: '#c2410c',
  },
  noTransactions: {
    color: '#888888',
    fontStyle: 'italic',
    padding: 12,
  },
});

function getProjectionText(projection: Projection): string {
  if (projection.status === 'complete') return 'Goal completed';
  if (projection.status === 'noProjection')
    return 'No projection available yet';
  if (projection.status === 'stalled')
    return 'Goal has stalled or is moving away from completion';
  if (projection.status === 'onTrack' && projection.projectedDate) {
    return `On track to complete by ${format(new Date(projection.projectedDate), 'MMM d, yyyy')}`;
  }
  return 'Unable to calculate projection';
}

export default function GoalDetailsPDF({
  goal,
  transactions,
  projection,
}: GoalDetailsPDFProps) {
  const progress = Math.min(goal.progress, 100).toFixed(2);
  const remaining = Math.max(goal.goal_target - goal.current, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{goal.goal_name}</Text>
          <Text style={styles.subtitle}>
            Created {format(new Date(goal.created_at), 'MMM d, yyyy')}
            {goal.deadline
              ? `  •  Due ${format(new Date(goal.deadline), 'MMM d, yyyy')}`
              : '  •  No deadline'}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Saved so far</Text>
            <Text style={styles.statValue}>
              {currencyFormatter.format(goal.current)}
            </Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Target</Text>
            <Text style={styles.statValue}>
              {currencyFormatter.format(goal.goal_target)}
            </Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Progress</Text>
            <Text style={styles.statValue}>{progress}%</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Remaining</Text>
            <Text style={styles.statValue}>
              {currencyFormatter.format(remaining)}
            </Text>
          </View>
        </View>

        {/* Projection */}
        <View style={styles.projectionBox}>
          <Text style={styles.projectionText}>
            {getProjectionText(projection)}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Transactions */}
        <Text style={styles.sectionTitle}>Transaction History</Text>

        {transactions.length === 0 ? (
          <Text style={styles.noTransactions}>No transactions yet.</Text>
        ) : (
          <View style={styles.table}>
            {/* Table header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.colDate]}>Date</Text>
              <Text style={[styles.tableHeaderText, styles.colType]}>Type</Text>
              <Text style={[styles.tableHeaderText, styles.colNote]}>Note</Text>
              <Text style={[styles.tableHeaderText, styles.colAmount]}>
                Amount
              </Text>
            </View>

            {/* Table rows */}
            {transactions.map((t, i) => (
              <View
                key={t.id}
                style={[styles.tableRow, i % 2 !== 0 ? styles.tableRowAlt : {}]}
              >
                <Text style={styles.colDate}>
                  {format(new Date(t.created_at), 'MMM d, yyyy')}
                </Text>
                <Text
                  style={[
                    styles.colType,
                    t.transaction_type === 'deposit'
                      ? styles.deposit
                      : styles.withdrawal,
                  ]}
                >
                  {t.transaction_type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                </Text>
                <Text style={styles.colNote}>{t.note ?? '—'}</Text>
                <Text
                  style={[
                    styles.colAmount,
                    t.transaction_type === 'deposit'
                      ? styles.deposit
                      : styles.withdrawal,
                  ]}
                >
                  {t.transaction_type === 'deposit' ? '+' : '-'}
                  {currencyFormatter.format(t.amount)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Savings Tracker</Text>
          <Text style={styles.footerText}>
            Generated {format(new Date(), 'MMM d, yyyy')}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
