import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';

import currencyFormatter from '../../utils/currencyFormatter';
import type { MonthlySavingsPDFProps } from '../../types/dashboardType';

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
  colMonth: { width: '20%' },
  colDeposit: { width: '15%' },
  colWithdrawal: { width: '45%' },
  colNet: { width: '20%', textAlign: 'right' },
  tableHeaderText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#666666',
    textTransform: 'uppercase',
  },
  positive: { color: '#4ade80' },
  negative: { color: '#f87171' },
  neutral: { color: '#666666' },
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
  noTransactions: {
    color: '#888888',
    fontStyle: 'italic',
    padding: 12,
  },
});

export default function MonthlySavingsPDF({
  monthlyActivity,
}: MonthlySavingsPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Monthly Savings</Text>
          <Text style={styles.subtitle}>
            As of {format(new Date(), 'MMM d, yyyy')}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Transactions */}
        <Text style={styles.sectionTitle}>Savings Table</Text>

        {monthlyActivity.length === 0 ? (
          <Text style={styles.noTransactions}>No transactions yet.</Text>
        ) : (
          <View style={styles.table}>
            {/* Table header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.colMonth]}>
                Month
              </Text>
              <Text style={[styles.tableHeaderText, styles.colDeposit]}>
                Deposit
              </Text>
              <Text style={[styles.tableHeaderText, styles.colWithdrawal]}>
                Withdrawal
              </Text>
              <Text style={[styles.tableHeaderText, styles.colNet]}>Net</Text>
            </View>

            {/* Table rows */}
            {monthlyActivity.map((ma, i) => {
              const net = ma.deposits - ma.withdrawals;

              return (
                <View
                  key={`${i}-${ma.month}`}
                  style={[
                    styles.tableRow,
                    i % 2 !== 0 ? styles.tableRowAlt : {},
                  ]}
                >
                  <Text style={styles.colMonth}>
                    {format(new Date(ma.month), 'MMMM')}
                  </Text>
                  <Text style={styles.colDeposit}>
                    {ma.deposits > 0
                      ? currencyFormatter.format(ma.deposits)
                      : '—'}
                  </Text>
                  <Text style={styles.colWithdrawal}>
                    {ma.withdrawals > 0
                      ? currencyFormatter.format(ma.withdrawals)
                      : '—'}
                  </Text>
                  <Text
                    style={[
                      styles.colNet,
                      net > 0
                        ? styles.positive
                        : net < 0
                          ? styles.negative
                          : styles.neutral,
                    ]}
                  >
                    {net >= 0 ? '+' : ''}
                    {currencyFormatter.format(net)}
                  </Text>
                </View>
              );
            })}
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
